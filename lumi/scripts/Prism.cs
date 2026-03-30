using UnityEngine;

public class Prism : MonoBehaviour
{
    public GameObject blinkObject;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
            blinkObject.SetActive(true);
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
            blinkObject.SetActive(false);
    }
}