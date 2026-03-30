using UnityEngine;
using System.Collections;

public class PlayerEye : MonoBehaviour
{
    [Header("Settings")]
    public float moveAmount = 2.0f;
    public float duration = 0.5f;

    private Vector3 originalLocalPos;
    private bool isMoving = false;

    void Start()
    {
        originalLocalPos = transform.localPosition;
    }

    public void MoveEye(Vector2 direction)
    {
        print("Moving Lumi's Eyes.");
        if (isMoving) return;

        Vector3 offset = new Vector3(direction.x, direction.y, 0).normalized * moveAmount;
        Vector3 targetPos = originalLocalPos + offset;

        StartCoroutine(MoveAndReturn(targetPos));
    }

    IEnumerator MoveAndReturn(Vector3 targetPos)
    {
        isMoving = true;
        yield return StartCoroutine(LerpPosition(targetPos, duration));
        yield return StartCoroutine(LerpPosition(originalLocalPos, duration));
        isMoving = false;
    }

    IEnumerator LerpPosition(Vector3 target, float time)
    {
        float elapsed = 0;
        Vector3 startPos = transform.localPosition;

        while (elapsed < time)
        {
            transform.localPosition = Vector3.Lerp(startPos, target, elapsed / time);
            elapsed += Time.deltaTime;
            yield return null;
        }

        transform.localPosition = target;
    }
}