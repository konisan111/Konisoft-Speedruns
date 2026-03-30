using UnityEngine;

public class DisconnectChains : MonoBehaviour
{
    Rigidbody2D rb;
    AudioSource ad;
    void Start()
    {
        ad = gameObject.GetComponent<AudioSource>();
        rb = gameObject.GetComponent<Rigidbody2D>();
        rb.bodyType = RigidbodyType2D.Dynamic;
        ad.Play();
    }
}
