using UnityEngine;

public class ObstacleSensor : MonoBehaviour
{
    private PlayerController playerController;
    public GameObject PlayerObject;

    void Start()
    {
        playerController = PlayerObject.GetComponent<PlayerController>();
        if (playerController == null)
        {
            Debug.LogError("PlayerController script not found on the GameObject.");
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Obstacle")
        {
            playerController.obstacleDetection = true;
            Debug.Log("Obstacle detected!");
        }
    }
}
