using UnityEngine;

public class Swell : MonoBehaviour
{
    [Header("Movement Settings")]
    public float moveSpeed = 2.0f;
    public bool isVertical = false;
    public bool startPositiveDirection = true;

    private Vector3 moveDirection;

    private void Start()
    {
        if (isVertical)
        {
            moveDirection = startPositiveDirection ? Vector3.up : Vector3.down;
        }
        else
        {
            moveDirection = startPositiveDirection ? Vector3.right : Vector3.left;
        }
    }

    private void Update()
    {
        transform.position += moveDirection * moveSpeed * Time.deltaTime;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Wall"))
        {
            moveDirection = -moveDirection;
        }
    }
}