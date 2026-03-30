using System.Collections;
using UnityEngine;
using UnityEngine.InputSystem;

public class CutsceneCameraControl : MonoBehaviour
{
    public GameObject eye1;
    public GameObject eye2;
    public GameObject cutsceneCanvas;

    void Start() { StartCoroutine(CameraControl()); }

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

    public IEnumerator CameraControl()
    {
        yield return new WaitForSeconds(11);
        VibrateController(0.5f, 0.5f);
        eye1.SetActive(true);
        eye2.SetActive(false);
        yield return new WaitForSeconds(2f);
        cutsceneCanvas.SetActive(true);
    }
}
