using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using UnityEngine.InputSystem;
using System.Collections;

public class ButtonActivator : MonoBehaviour
{
    public Button firstButtonToSelect;

    void OnEnable()
    {
        StartCoroutine(SelectFirstButtonNextFrame());
    }

    IEnumerator SelectFirstButtonNextFrame()
    {
        yield return null;
        if (firstButtonToSelect != null && firstButtonToSelect.gameObject.activeInHierarchy)
        {
            EventSystem.current.SetSelectedGameObject(firstButtonToSelect.gameObject);
            firstButtonToSelect.Select();
        }
    }

    void Update()
    {
        if (Gamepad.current != null &&
            (Gamepad.current.leftStick.ReadValue().magnitude > 0.1f ||
             Gamepad.current.dpad.ReadValue().magnitude > 0.1f ||
             Gamepad.current.buttonSouth.wasPressedThisFrame))
        {
            GameObject current = EventSystem.current.currentSelectedGameObject;

            if (current == null || !current.transform.IsChildOf(transform))
            {
                if (firstButtonToSelect != null && firstButtonToSelect.gameObject.activeInHierarchy)
                {
                    EventSystem.current.SetSelectedGameObject(firstButtonToSelect.gameObject);
                    firstButtonToSelect.Select();
                }
            }
        }

        if (Mouse.current != null && Mouse.current.leftButton.wasPressedThisFrame)
        {
            if (EventSystem.current.currentSelectedGameObject == null &&
                firstButtonToSelect != null && firstButtonToSelect.gameObject.activeInHierarchy)
            {
                EventSystem.current.SetSelectedGameObject(firstButtonToSelect.gameObject);
            }
        }
    }
}
