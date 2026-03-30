using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using UnityEngine.UI;

public class UIReselector : MonoBehaviour
{
    public Button defaultButton;

    void Update()
    {
        if (Gamepad.current != null)
        {
            if (Gamepad.current.leftStick.ReadValue().magnitude > 0.1f ||
                Gamepad.current.dpad.ReadValue().magnitude > 0.1f ||
                Gamepad.current.buttonSouth.wasPressedThisFrame)
            {
                if (EventSystem.current.currentSelectedGameObject == null)
                {
                    EventSystem.current.SetSelectedGameObject(defaultButton.gameObject);
                }
            }
        }
    }
}
