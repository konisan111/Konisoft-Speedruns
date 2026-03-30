using UnityEngine;

public class Checkpoint : MonoBehaviour{
    public GameObject lastCheckpoint;
    public GameObject floppyDisk;
    public GameObject collisionEffect;
    public GameObject despawnFloppy;
    public bool doNotSpawnAnimationAgain = false;

    void OnTriggerEnter2D(Collider2D other) {
        if (other.gameObject.tag == "Player" && doNotSpawnAnimationAgain == false){
            doNotSpawnAnimationAgain = true;
            Instantiate(collisionEffect, transform.position, transform.rotation);
            Instantiate(despawnFloppy, transform.position, transform.rotation);
            Destroy(floppyDisk);
            Destroy(lastCheckpoint);
        }
        gameObject.tag = "Checkpoint";
    }
}
