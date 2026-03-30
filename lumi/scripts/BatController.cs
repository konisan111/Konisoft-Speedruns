using UnityEngine;
public class BatController : MonoBehaviour
{
    public string leftTriggerName = "LeftTrigger";
    public string rightTriggerName = "RightTrigger";
    public float moveSpeed = 5f;
    public bool movingRight = true;
    public SpriteRenderer spriteRenderers;
    public GameObject BodySprite;

    void Start()
    {
        spriteRenderers = BodySprite.GetComponent<SpriteRenderer>();
    }

    void Update()
    {
        if (movingRight)
        {
            transform.Translate(Vector2.right * moveSpeed * Time.deltaTime);
            SetSpriteFlip(true);
        }
        else
        {
            transform.Translate(Vector2.left * moveSpeed * Time.deltaTime);
            SetSpriteFlip(false);
        }
    }

    void SetSpriteFlip(bool flip)
    {
        spriteRenderers.flipX = flip;
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.name == leftTriggerName)
        {
            movingRight = true;
        }
        else if (other.gameObject.name == rightTriggerName)
        {
            movingRight = false;
        }
    }
}