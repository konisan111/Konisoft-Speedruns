using UnityEngine;

public class EndGateTrigger : MonoBehaviour{
    public GameObject playerObject;
    PlayerController playerController;

    void Start(){   
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
        StartCoroutine(playerController.LoadNextLevel());
    }
}
