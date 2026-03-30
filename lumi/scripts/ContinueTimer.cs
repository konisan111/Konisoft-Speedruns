using UnityEngine;

public class ContinueTimer : MonoBehaviour
{
    public PlayerController playerController;
    public GameObject player;

    private void Start()
    {
        playerController = player.GetComponent<PlayerController>();
    }

    public void OnButtonPress()
    {
        playerController.timerStop = false;
    }
}
