using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class PressEscPauseMenu : MonoBehaviour
{
    public GameObject mainUI;
    public GameObject pauseMenu;
    public GameObject pauseText;
    public List<GameObject> objectsToDisable;

    private InputAction unpauseAction;

    void OnEnable()
    {
        unpauseAction = new InputAction(type: InputActionType.Button, binding: "<Keyboard>/escape");
        unpauseAction.AddBinding("<Gamepad>/menu");
        unpauseAction.performed += OnUnpausePressed;
        unpauseAction.Enable();
    }

    void OnDisable()
    {
        unpauseAction.performed -= OnUnpausePressed;
        unpauseAction.Disable();
    }

    private void OnUnpausePressed(InputAction.CallbackContext context)
    {
        foreach (GameObject obj in objectsToDisable)
        {
            if (obj != null)
            {
                obj.SetActive(false);
            }
        }

        Time.timeScale = 1;
        pauseText.SetActive(false);
        mainUI.SetActive(true);
        pauseMenu.SetActive(false);
    }
}
