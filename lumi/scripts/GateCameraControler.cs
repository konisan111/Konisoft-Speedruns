using System.Collections;
using UnityEngine;
using UnityEngine.InputSystem;

public class GateCameraControler : MonoBehaviour
{
    public float shakeMagnitude = 0.2f;
    public float shakeSpeed = 20f;
    public float delayBeforeShake = 36f;
    public float shakeDuration = 1f;
    public Transform lumiObject;
    public float rotationSpeed = 2f;

    private Animator animator;
    private Vector3 initialPosition;
    private float timeCounter;
    private bool isShaking = false;
    private bool isRotatingLumi = false;

    public GameObject fragment1;
    public GameObject fragment2;
    public GameObject fragment3;
    public GameObject fragment4;
    public GameObject fragment5;
    public GameObject fadeOut;
    public GameObject musicObject;
    public GameObject shakeSound;
    public GameObject defaultEnv;
    public GameObject characterEnv;
    public GameObject bangSound;
    public GameObject whiteOutFade;
    public GameObject nextCamera;
    public bool callOnce;

    void Start()
    {
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        if (callOnce && fragment1.activeInHierarchy == true && fragment2.activeInHierarchy == true && fragment3.activeInHierarchy == true && fragment4.activeInHierarchy == true && fragment5.activeInHierarchy == true)
        {
            callOnce = false;
            StartCoroutine(ShakeSequence());
        }

        if (isShaking)
        {
            timeCounter += Time.deltaTime * shakeSpeed;
            float offsetX = (Mathf.PerlinNoise(timeCounter, 0f) * 2f - 1f) * shakeMagnitude;
            float offsetY = (Mathf.PerlinNoise(0f, timeCounter) * 2f - 1f) * shakeMagnitude;

            Vector3 newPos = new Vector3(
                initialPosition.x + offsetX,
                initialPosition.y + offsetY,
                -9.27f
            );
            transform.localPosition = newPos;
        }
    }

    public void VibrateController(float duration, float frequency)
    {
        if (Gamepad.current != null)
        {
            Gamepad.current.SetMotorSpeeds(frequency, frequency);
            Invoke("StopVibration", duration);
        }
    }

    void StopVibration()
    {
        if (Gamepad.current != null)
            Gamepad.current.SetMotorSpeeds(0f, 0f);
    }

    private IEnumerator ShakeSequence()
    {
        animator.enabled = false;
        yield return new WaitForSeconds(1f);
        VibrateController(2.3f, 0.6f);
        isShaking = true;
        shakeSound.SetActive(true);
        musicObject.SetActive(false);
        yield return new WaitForSeconds(2.3f);
        isShaking = false;
        fadeOut.SetActive(true);
        yield return new WaitForSeconds(1f);
        VibrateController(4f, 1f);
        defaultEnv.SetActive(false);
        characterEnv.SetActive(true);
        fadeOut.SetActive(false);
        bangSound.SetActive(true);
        fragment1.SetActive(false);
        fragment2.SetActive(false);
        fragment3.SetActive(false);
        fragment4.SetActive(false);
        fragment5.SetActive(false);
        nextCamera.SetActive(true);
        whiteOutFade.SetActive(true);
        gameObject.SetActive(false);
    }
}
