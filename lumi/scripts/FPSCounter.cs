using UnityEngine;
using UnityEngine.UI;

public class FPSCounter : MonoBehaviour
{
    public Text fpsText;
    public float updateInterval = 0.5f;

    private float accum = 0f;
    private int frames = 0;
    private float timeLeft;

    void Start()
    {
        timeLeft = updateInterval;
    }

    void Update()
    {
        float dt = Time.unscaledDeltaTime;
        timeLeft -= dt;
        accum += 1f / dt;
        frames++;

        if (timeLeft <= 0f)
        {
            float fps = accum / frames;
            fpsText.text = "FPS in the current scene: " + Mathf.RoundToInt(fps).ToString() + " FPS";
            timeLeft = updateInterval;
            accum = 0f;
            frames = 0;
        }
    }
}
