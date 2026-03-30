using UnityEngine;

public class Star : MonoBehaviour
{
    public new Animation animation;
    PlayerController playerController;
    public GameObject playerObject;
    public GameObject pairStarObject;
    public string starTag;

    void Start()
    {
        GameObject[] stars = GameObject.FindGameObjectsWithTag(tag);
        if (stars.Length > 1)
            foreach (GameObject star in stars)
                if (star != gameObject)
                    pairStarObject = star;
        starTag = gameObject.tag;
        playerObject = GameObject.FindGameObjectWithTag("Player");
        animation = gameObject.GetComponent<Animation>();
        playerController = playerObject.GetComponent<PlayerController>();
    }

    void OnTriggerStay2D(Collider2D other)
    {
        if (other.gameObject.tag == "Player" && playerController.starTPTriggered)
        {
            TeleportPlayer();
            animation.Play();
        }
        if (other.gameObject.tag == "Obstacle")
        {
            gameObject.tag = "Untagged";
        }
    }

    void OnTriggerExit2D(Collider2D other)
    {
        if (other.gameObject.tag == "Obstacle")
        {
            gameObject.tag = starTag;
        }
    }

    public void TeleportPlayer()
    {
        playerController.starTPTriggered = false;
        playerObject.transform.position = new Vector3(pairStarObject.transform.position.x, pairStarObject.transform.position.y + 0.3f, pairStarObject.transform.position.z);
    }
}