using UnityEngine;
using System.Linq;
public class RespawnParticle : MonoBehaviour{
    public float speed;
    public GameObject playerTag;
    private Vector3 targetPosition;
    public bool capableOfRespawning = false;
    private GameObject closestCheckpoint;
    private ParticleSystem ps;
    public GameObject respawnEffect;

    void Start(){
        ps = GetComponent<ParticleSystem>();
        GameObject closestCheckpoint = FindClosest();
       
        if (closestCheckpoint != null){
            targetPosition = closestCheckpoint.transform.position;
            Debug.Log("The closest checkpoint is at: " + targetPosition);
            capableOfRespawning = true;
        }
        else{
            Debug.Log("No checkpoint found.");
        }
    }

    void Update(){
        if (capableOfRespawning)
            transform.position = Vector3.MoveTowards(transform.position, targetPosition, speed * Time.deltaTime);
        if (gameObject.transform.position == targetPosition && capableOfRespawning) {
            var main = ps.main;
            main.loop = false;
            ps.Stop();
            var allObjects = Resources.FindObjectsOfTypeAll<GameObject>();
            var targetObject = allObjects.FirstOrDefault(obj => obj.name == "Player");
            targetObject.SetActive(true);
            Instantiate(respawnEffect, transform.position, transform.rotation);
            capableOfRespawning = false;
        }
    }
    GameObject FindClosest(){
        GameObject[] checkpoints = GameObject.FindGameObjectsWithTag("Checkpoint");
        GameObject closest = null;
        float minDistance = Mathf.Infinity;
        Vector3 currentPosition = transform.position;

        foreach (GameObject checkpoint in checkpoints){
            float distance = Vector3.Distance(checkpoint.transform.position, currentPosition);
            if (distance < minDistance){
                closest = checkpoint;
                minDistance = distance;
            }
        }
        return closest;
    }
}