using UnityEngine;

public class SkeletonObstacle : MonoBehaviour
{
    public GameObject skeletonParticles;
    private PlayerController s;
    private GameObject playerObject;
    void Start()
    {
        playerObject = GameObject.FindGameObjectWithTag("Player");
        s = playerObject.GetComponent<PlayerController>();
    }
    public void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("PlayerSensor"))
        {
            s.currentStepCounts++;
            Instantiate(skeletonParticles, transform.position, Quaternion.identity);
            Destroy(gameObject);
        }
    }
}
