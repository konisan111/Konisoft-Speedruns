using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Image))]
public class RainbowUI : MonoBehaviour
{
    [Range(0.1f, 5f)]
    public float speed = 1f;

    [Range(0f, 1f)]
    public float saturation = 0.8f;

    [Range(0f, 1f)]
    public float brightness = 1f;

    private Image uiImage;
    private float hue = 0f;

    void Start() { uiImage = GetComponent<Image>(); }

    void Update()
    {
        hue += speed * Time.deltaTime;
        if (hue > 1f) hue -= 1f;
        uiImage.color = Color.HSVToRGB(hue, saturation, brightness);
    }
}