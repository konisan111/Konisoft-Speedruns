using UnityEngine;
using UnityEngine.UI;

public class SoundSlider : MonoBehaviour
{
    public Slider soundSlider;
    public Text soundText;

    void Start()
    {
        soundSlider.minValue = 0f;
        soundSlider.maxValue = 1f;
        soundSlider.value = GameManager.Instance != null ? GameManager.Instance.GetVolume() : 1f;

        UpdateSoundText(soundSlider.value);
        soundSlider.onValueChanged.AddListener(OnSliderValueChanged);
        ApplyVolume(soundSlider.value);
    }

    void OnSliderValueChanged(float value)
    {
        UpdateSoundText(value);
        ApplyVolume(value);
    }

    void UpdateSoundText(float value)
    {
        int percent = Mathf.RoundToInt(value * 100f);
        soundText.text = $"sound: {percent}%";
    }

    void ApplyVolume(float value)
    {
        AudioListener.volume = value;

        if (GameManager.Instance != null)
        {
            GameManager.Instance.SetVolume(value);
        }
    }
}
