using UnityEngine;

public class DiscoTile : MonoBehaviour
{
    public SpriteRenderer mainSprite;
    public SpriteRenderer overlaySprite;
    public GameObject deadDiscoTile;

    [Range(0f, 5f)]
    public float cycleSpeed = 1f;

    [Range(0f, 1f)]
    public float overlayAlpha = 0.5f;

    public bool isFake = false;
    public float flashDuration = 0.5f;

    private float hue = 0f;
    private float flashTimer = 0f;
    private Color feedbackColor;
    private bool hasSpawned = false;

    void Start()
    {
        hue = Random.Range(0f, 1f);
    }

    void Update()
    {
        if (flashTimer > 0)
        {
            flashTimer -= Time.deltaTime;
            ApplyColor(feedbackColor);

            if (isFake && !hasSpawned)
            {
                SpawnDeadTile();
            }
        }
        else
        {
            hue = (hue + Time.deltaTime * cycleSpeed) % 1f;
            Color rainbowColor = Color.HSVToRGB(hue, 1f, 1f);
            ApplyColor(rainbowColor);
        }
    }

    void ApplyColor(Color targetColor)
    {
        if (mainSprite != null)
        {
            mainSprite.color = targetColor;
        }

        if (overlaySprite != null)
        {
            Color alphaColor = targetColor;
            alphaColor.a = overlayAlpha;
            overlaySprite.color = alphaColor;
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            feedbackColor = isFake ? Color.black : Color.white;
            flashTimer = flashDuration;
        }
    }

    void SpawnDeadTile()
    {
        hasSpawned = true;
        if (deadDiscoTile != null)
        {
            Instantiate(deadDiscoTile, transform.position, transform.rotation);
        }
        Destroy(gameObject);
    }
}