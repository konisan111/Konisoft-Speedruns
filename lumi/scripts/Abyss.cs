using UnityEngine;

[RequireComponent(typeof(SpriteRenderer))]
public class Abyss : MonoBehaviour
{
    public float speed = 1.0f;
    public float strength = 0.1f;
    private SpriteRenderer spriteRenderer;
    private Vector2[] originalVertices;
    private Vector2[] distortedVertices;

    void Start()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
        originalVertices = spriteRenderer.sprite.vertices;
        distortedVertices = new Vector2[originalVertices.Length];

        for (int i = 0; i < originalVertices.Length; i++) { distortedVertices[i] = originalVertices[i]; }
    }

    void Update()
    {
        for (int i = 0; i < originalVertices.Length; i++)
        {
            float offset = Mathf.Sin(Time.time * speed + i) * strength;
            Vector2 distortedVertex = originalVertices[i] + new Vector2(0, offset);
            distortedVertices[i] = Vector2.Lerp(originalVertices[i], distortedVertex, 0.5f); // Clamping within bounds
        }

        spriteRenderer.sprite.OverrideGeometry(distortedVertices, spriteRenderer.sprite.triangles);
    }
}