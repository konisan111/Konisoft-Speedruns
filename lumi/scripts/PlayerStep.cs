using UnityEngine;

public class PlayerStep : MonoBehaviour
{
    public float shakeMagnitude = 0.1f;
    private Vector3 originalPos;
    private float timer = 0f;
    private bool isShaking = false;

    void Start()
    {
        originalPos = transform.position;
    }

    public void StartShake()
    {
        timer = 0.2f;
        isShaking = true;
    }

    void Update()
    {
        if (isShaking)
        {
            if (timer > 0)
            {
                float x = originalPos.x + Random.Range(-1f, 1f) * shakeMagnitude;
                float y = originalPos.y + Random.Range(-1f, 1f) * shakeMagnitude;

                transform.position = new Vector3(x, y, originalPos.z);

                timer -= Time.deltaTime;
            }
            else
            {
                isShaking = false;
                transform.position = originalPos;
            }
        }
    }
}