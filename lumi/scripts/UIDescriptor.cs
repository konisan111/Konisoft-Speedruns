using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UI;

public class UIDescriptor : MonoBehaviour
{
    [Header("Cursor Images")]
    public Image cursorImage;
    public Sprite mouseCursorSprite;
    public Sprite controllerCursorSprite;

    [Header("Settings")]
    public bool centerWhenController = true;
    public float controllerCursorScale = 2f;

    private bool usingController = false;
    private Vector3 originalScale;

    void Start()
    {
        if (cursorImage == null)
        {
            Debug.LogError("Cursor Image is not assigned!");
            enabled = false;
            return;
        }

        originalScale = cursorImage.rectTransform.localScale;
    }

    void Update()
    {
        DetectInputDevice();
        UpdateCursor();
    }

    private void DetectInputDevice()
    {
        if (Mouse.current != null && (Mouse.current.delta.ReadValue() != Vector2.zero ||
                                      Mouse.current.leftButton.wasPressedThisFrame ||
                                      Mouse.current.rightButton.wasPressedThisFrame))
        {
            usingController = false;
        }

        if (Gamepad.current != null && (GamepadButtonPressed() ||
                                        Gamepad.current.leftStick.ReadValue() != Vector2.zero ||
                                        Gamepad.current.rightStick.ReadValue() != Vector2.zero))
        {
            usingController = true;
        }
    }

    private bool GamepadButtonPressed()
    {
        if (Gamepad.current == null) return false;

        foreach (var control in Gamepad.current.allControls)
        {
            if (control is UnityEngine.InputSystem.Controls.ButtonControl button && button.wasPressedThisFrame)
            {
                return true;
            }
        }

        return false;
    }

    private void UpdateCursor()
    {
        if (cursorImage == null) return;

        if (usingController)
        {
            cursorImage.sprite = controllerCursorSprite;

            if (centerWhenController)
                cursorImage.rectTransform.position = new Vector3(Screen.width / 2f, Screen.height / 2f, 0f);

            cursorImage.rectTransform.localScale = originalScale * controllerCursorScale;
        }
        else
        {
            cursorImage.sprite = mouseCursorSprite;

            if (Mouse.current != null)
            {
                Vector2 mousePos = Mouse.current.position.ReadValue();
                cursorImage.rectTransform.position = mousePos;
            }

            cursorImage.rectTransform.localScale = originalScale;
        }
    }
}
