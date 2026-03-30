using UnityEngine;
using System.Collections.Generic;

[RequireComponent(typeof(LineRenderer), typeof(EdgeCollider2D))]
public class LaserControler : MonoBehaviour
{
    public float maxDistance = 50f;
    public LayerMask collisionMask;
    public int maxBounces = 10;

    public float waveFrequency = 10f;
    public float waveAmplitude = 0.1f;
    public float waveSpeed = 20f;
    public int segmentsPerUnit = 10;

    public float startDelay = 0f;
    public float activeDuration = 2f;
    public float inactiveDuration = 1f;
    public GameObject flashObject;

    private float timer;
    private bool isActive = false;
    private bool isStartingUp = true;

    private LineRenderer lineRenderer;
    private EdgeCollider2D edgeCollider;
    private List<Vector3> finalPoints = new List<Vector3>();
    private List<Vector2> colliderPoints = new List<Vector2>();

    void Start()
    {
        lineRenderer = GetComponent<LineRenderer>();
        edgeCollider = GetComponent<EdgeCollider2D>();
        lineRenderer.useWorldSpace = true;
        edgeCollider.isTrigger = true;

        if (startDelay > 0)
        {
            timer = startDelay;
            isStartingUp = true;
            isActive = false;
        }
        else
        {
            isStartingUp = false;
            isActive = true;
            timer = activeDuration;
        }

        edgeCollider.enabled = isActive;
        if (flashObject != null) flashObject.SetActive(isActive);
    }

    void Update()
    {
        HandleTimer();

        if (isActive)
        {
            CalculateLaser();
        }
        else
        {
            ClearLaser();
        }
    }

    void HandleTimer()
    {
        timer -= Time.deltaTime;
        if (timer <= 0)
        {
            if (isStartingUp)
            {
                isStartingUp = false;
                isActive = true;
                timer = activeDuration;
            }
            else
            {
                isActive = !isActive;
                timer = isActive ? activeDuration : inactiveDuration;
            }

            edgeCollider.enabled = isActive;
            if (flashObject != null) flashObject.SetActive(isActive);
        }
    }

    void CalculateLaser()
    {
        finalPoints.Clear();
        Vector2 currentPos = transform.position;
        Vector2 currentDir = transform.right;

        List<Vector3> corePoints = new List<Vector3>();
        corePoints.Add(transform.position);

        for (int i = 0; i < maxBounces; i++)
        {
            RaycastHit2D hit = Physics2D.Raycast(currentPos, currentDir, maxDistance, collisionMask);

            if (hit.collider != null)
            {
                corePoints.Add((Vector3)hit.point);
                Vector2 nextDir = Vector2.zero;
                GameObject hitObj = hit.collider.gameObject;

                if (hitObj.CompareTag("Prism Top Left"))
                {
                    if (currentDir == Vector2.left) nextDir = Vector2.down;
                    else if (currentDir == Vector2.up) nextDir = Vector2.right;
                }
                else if (hitObj.CompareTag("Prism Top Right"))
                {
                    if (currentDir == Vector2.right) nextDir = Vector2.down;
                    else if (currentDir == Vector2.up) nextDir = Vector2.left;
                }
                else if (hitObj.CompareTag("Prism Bottom Left"))
                {
                    if (currentDir == Vector2.left) nextDir = Vector2.up;
                    else if (currentDir == Vector2.down) nextDir = Vector2.right;
                }
                else if (hitObj.CompareTag("Prism Bottom Right"))
                {
                    if (currentDir == Vector2.right) nextDir = Vector2.up;
                    else if (currentDir == Vector2.down) nextDir = Vector2.left;
                }

                if (nextDir != Vector2.zero)
                {
                    currentDir = nextDir;
                    currentPos = hit.point + (currentDir * 0.05f);
                }
                else
                {
                    break;
                }
            }
            else
            {
                corePoints.Add((Vector3)currentPos + (Vector3)(currentDir * maxDistance));
                break;
            }
        }

        for (int i = 0; i < corePoints.Count - 1; i++)
        {
            SubdivideAndAnimate(corePoints[i], corePoints[i + 1]);
        }

        UpdateLineRendererAndCollider();
    }

    void ClearLaser()
    {
        finalPoints.Clear();
        colliderPoints.Clear();
        lineRenderer.positionCount = 0;
        if (edgeCollider.enabled) edgeCollider.enabled = false;
        if (flashObject != null && flashObject.activeSelf) flashObject.SetActive(false);
    }

    void SubdivideAndAnimate(Vector3 start, Vector3 end)
    {
        float distance = Vector3.Distance(start, end);
        int numberOfPoints = Mathf.Max(2, Mathf.RoundToInt(distance * segmentsPerUnit));

        Vector3 direction = (end - start).normalized;
        Vector3 normal = new Vector3(-direction.y, direction.x, 0);

        for (int i = 0; i < numberOfPoints; i++)
        {
            float t = (float)i / (numberOfPoints - 1);
            Vector3 basePoint = Vector3.Lerp(start, end, t);

            float waveFade = Mathf.Sin(t * Mathf.PI);
            float wave = Mathf.Sin(t * distance * waveFrequency - Time.time * waveSpeed) * (waveAmplitude * waveFade);

            finalPoints.Add(basePoint + (normal * wave));
        }
    }

    void UpdateLineRendererAndCollider()
    {
        lineRenderer.positionCount = finalPoints.Count;
        lineRenderer.SetPositions(finalPoints.ToArray());

        if (!edgeCollider.enabled) edgeCollider.enabled = true;
        if (flashObject != null && !flashObject.activeSelf) flashObject.SetActive(true);

        colliderPoints.Clear();
        for (int i = 0; i < finalPoints.Count; i++)
        {
            colliderPoints.Add(transform.InverseTransformPoint(finalPoints[i]));
        }
        edgeCollider.SetPoints(colliderPoints);
    }
}