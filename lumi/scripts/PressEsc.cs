using UnityEngine;
using UnityEngine.InputSystem;

public class PressEsc : MonoBehaviour
{
    public GameObject mainUI;
    public GameObject pauseMenu;
    public GameObject settingsObject;
    public GameObject pauseText;

    private InputAction pauseAction;
    private GameObject playerObject;
    PlayerController playerController;

    void OnEnable()
    {
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
        pauseAction = new InputAction(type: InputActionType.Button, binding: "<Keyboard>/escape");
        pauseAction.AddBinding("<Gamepad>/menu");
        pauseAction.performed += OnPausePressed;
        pauseAction.Enable();
    }

    void OnDisable()
    {
        pauseAction.performed -= OnPausePressed;
        pauseAction.Disable();
    }

    private void OnPausePressed(InputAction.CallbackContext context)
    {
        if (!settingsObject.activeSelf && playerController.playerWon == false)
        {
            Time.timeScale = 0;
            pauseText.SetActive(true);
            pauseMenu.SetActive(true);
            mainUI.SetActive(false);
        }
    }
}
