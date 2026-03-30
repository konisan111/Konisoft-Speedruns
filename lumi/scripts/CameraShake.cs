using UnityEngine;
using UnityEngine.InputSystem;

public class CameraShake : MonoBehaviour
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
    public GameObject eyesClosed;
    public GameObject eyesOpen;
    public GameObject dungeonBulb;
    public GameObject voidParticles;
    public GameObject floatingPillar1;
    public GameObject floatingPillar2;
    public GameObject floatingPillar3;
    public GameObject floatingPillar4;
    public GameObject floatingIsland1;
    public GameObject floatingIsland2;
    public ParticleSystem aetherParticle1;
    public ParticleSystem aetherParticle2;
    public GameObject flickerObject;
    public GameObject MonsterEyes1;
    public GameObject MonsterEyes2;
    public GameObject MonsterEyes3;
    public GameObject haloObject;
    public GameObject windSound;
    public GameObject musicSound;
    public GameObject earthQuakeSound;
    public GameObject evilParticles;
    public GameObject bangSound;
    public GameObject electricSound;

    void Start()
    {
        animator = GetComponent<Animator>();
        StartCoroutine(ShakeSequence());
    }

    void Update()
    {
        if (isShaking)
        {
            timeCounter += Time.deltaTime * shakeSpeed;
            float offsetX = Mathf.PerlinNoise(timeCounter, 0f) * 2f - 1f;
            float offsetY = Mathf.PerlinNoise(0f, timeCounter) * 2f - 1f;
            Vector3 shakeOffset = new Vector3(offsetX, offsetY, 0f) * shakeMagnitude;
            transform.localPosition = initialPosition + shakeOffset;
        }

        if (isRotatingLumi && lumiObject != null)
        {
            Quaternion targetRotation = Quaternion.Euler(0, 0, 0);
            lumiObject.rotation = Quaternion.Lerp(lumiObject.rotation, targetRotation, Time.deltaTime * rotationSpeed);
            if (Quaternion.Angle(lumiObject.rotation, targetRotation) < 0.1f)
            {
                lumiObject.rotation = targetRotation;
                isRotatingLumi = false;
            }
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

    private System.Collections.IEnumerator ShakeSequence()
    {
        yield return new WaitForSeconds(delayBeforeShake - 1f);
        earthQuakeSound.SetActive(true);
        yield return new WaitForSeconds(1f);
        VibrateController(shakeDuration, 0.5f);
        windSound.SetActive(false);
        musicSound.SetActive(false);
        aetherParticle1.Stop();
        aetherParticle2.Stop();
        animator.enabled = false;
        transform.position = new Vector3(4, 7, 228);
        initialPosition = transform.localPosition;
        isShaking = true;
        timeCounter = 0f;
        yield return new WaitForSeconds(shakeDuration);
        electricSound.SetActive(false);
        isShaking = false;
        transform.localPosition = initialPosition;
        lumiObject.GetComponent<Rotator>().enabled = false;
        isRotatingLumi = true;
        eyesClosed.SetActive(false);
        VibrateController(0.1f, 0.1f);
        eyesOpen.SetActive(true);
        yield return new WaitForSeconds(2f);
        dungeonBulb.SetActive(true);
        voidParticles.SetActive(true);
        yield return new WaitForSeconds(2f);
        VibrateController(0.1f, 0.3f);
        floatingPillar1.SetActive(true);
        yield return new WaitForSeconds(.2f);
        VibrateController(0.1f, 0.3f);
        floatingPillar2.SetActive(true);
        yield return new WaitForSeconds(.2f);
        VibrateController(0.1f, 0.3f);
        floatingPillar3.SetActive(true);
        yield return new WaitForSeconds(.2f);
        VibrateController(0.1f, 0.3f);
        floatingPillar4.SetActive(true);
        yield return new WaitForSeconds(.2f);
        VibrateController(0.1f, 0.3f);
        floatingIsland1.SetActive(true);
        yield return new WaitForSeconds(.2f);
        VibrateController(0.1f, 0.3f);
        floatingIsland2.SetActive(true);
        yield return new WaitForSeconds(2f);
        flickerObject.SetActive(true);
        transform.position = new Vector3(4, 7, 230);
        evilParticles.SetActive(true);
        yield return new WaitForSeconds(.4f);
        VibrateController(0.4f, 0.5f);
        flickerObject.SetActive(false);
        MonsterEyes1.SetActive(true);
        yield return new WaitForSeconds(.4f);
        MonsterEyes1.SetActive(false);
        flickerObject.SetActive(true);
        transform.position = new Vector3(4, 7, 240);
        yield return new WaitForSeconds(.4f);
        VibrateController(0.4f, 0.5f);
        flickerObject.SetActive(false);
        MonsterEyes2.SetActive(true);
        yield return new WaitForSeconds(.4f);
        MonsterEyes2.SetActive(false);
        flickerObject.SetActive(true);
        transform.position = new Vector3(4, 7, 250);
        yield return new WaitForSeconds(.4f);
        VibrateController(0.4f, 0.5f);
        flickerObject.SetActive(false);
        MonsterEyes3.SetActive(true);
        yield return new WaitForSeconds(.4f);
        VibrateController(0.1f, 0.2f);
        flickerObject.SetActive(true);
        haloObject.SetActive(true);
    }
}
