using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Controls;
using UnityEngine.UI;

public class CursorSwitcherUI : MonoBehaviour
{
    [Header("Cursor Textures")]
    public Texture2D mouseCursor;

    [Header("Cursor Settings")]
    public Vector2 hotSpot = Vector2.zero;
    public CursorMode cursorMode = CursorMode.Auto;

    [Header("Controller Cursor UI")]
    public Image controllerCursorImage;

    [Header("Behavior Options")]
    public bool hideCursorWithController = false;
    private bool usingController = false;
    private bool lastUsingController = false;

    void Start()
    {
        SetMouseCursor();

        if (controllerCursorImage != null)
        {
            controllerCursorImage.gameObject.SetActive(false);
            controllerCursorImage.rectTransform.position = new Vector2(Screen.width / 2f, Screen.height / 2f);
        }

        lastUsingController = usingController;
    }

    void Update()
    {
        DetectInputDevice();

        if (usingController != lastUsingController)
        {
            if (usingController)
            {
                Debug.Log("Controller detected");
                SetControllerCursor();
            }
            else
            {
                Debug.Log("Mouse detected");
                SetMouseCursor();
            }

            lastUsingController = usingController;
        }
    }

    private void DetectInputDevice()
    {
        if (Mouse.current != null)
        {
            if (Mouse.current.delta.ReadValue() != Vector2.zero ||
                Mouse.current.leftButton.isPressed ||
                Mouse.current.rightButton.isPressed)
            {
                usingController = false;
                return;
            }
        }

        if (Gamepad.current != null)
        {
            var gamepad = Gamepad.current;

            foreach (var control in gamepad.allControls)
            {
                if (control is ButtonControl btn && btn.isPressed ||
                    (control is StickControl stick && stick.ReadValue() != Vector2.zero) ||
                    (control is AxisControl axis && Mathf.Abs(axis.ReadValue()) > 0.1f))
                {
                    usingController = true;
                    return;
                }
            }
        }
    }

    private void SetMouseCursor()
    {
        UnityEngine.Cursor.lockState = CursorLockMode.None;
        UnityEngine.Cursor.visible = true;
        UnityEngine.Cursor.SetCursor(mouseCursor, hotSpot, cursorMode);

        if (controllerCursorImage != null)
            controllerCursorImage.gameObject.SetActive(false);
    }

    private void SetControllerCursor()
    {
        UnityEngine.Cursor.lockState = CursorLockMode.Locked;
        UnityEngine.Cursor.visible = false;

        if (controllerCursorImage != null)
        {
            controllerCursorImage.gameObject.SetActive(!hideCursorWithController);
            controllerCursorImage.rectTransform.position = new Vector2(Screen.width / 2f, Screen.height / 2f);
        }
    }
}
