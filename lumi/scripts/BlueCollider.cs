using UnityEngine;

public class BlueCollider : MonoBehaviour
{
    public bool playerDetected;

    public void OnTriggerEnter2D(Collider2D other) { if (other.gameObject.tag == "Player") playerDetected = true; }
    public void OnTriggerExit2D(Collider2D other) { if (other.gameObject.tag == "Player") playerDetected = false; }
    public void OnTriggerStay2D(Collider2D other) { if (other.gameObject.tag == "Player") playerDetected = true; }
}
