using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Linq;

public class ResolutionSlider : MonoBehaviour
{
    public Slider resolutionSlider;
    public Text resolutionText;
    public Button applyButton;

    private List<Resolution> availableResolutions = new List<Resolution>();
    private int currentResolutionIndex = 0;

    void Start()
    {
        List<Resolution> presets = new List<Resolution>
        {
            new Resolution { width = 800, height = 600 },
            new Resolution { width = 1024, height = 768 },
            new Resolution { width = 1280, height = 720 },
            new Resolution { width = 1366, height = 768 },
            new Resolution { width = 1600, height = 900 },
            new Resolution { width = 1920, height = 1080 },
            Screen.currentResolution
        };

        availableResolutions = presets
            .GroupBy(res => new { res.width, res.height })
            .Select(group => group.First())
            .OrderBy(res => res.width)
            .ToList();

        resolutionSlider.minValue = 0;
        resolutionSlider.maxValue = availableResolutions.Count - 1;
        resolutionSlider.wholeNumbers = true;

        resolutionSlider.onValueChanged.AddListener(OnSliderValueChanged);
        applyButton.onClick.AddListener(ApplyResolution);

        int index = availableResolutions.FindIndex(r => r.width == Screen.width && r.height == Screen.height);
        currentResolutionIndex = (index != -1) ? index : availableResolutions.Count - 1;

        resolutionSlider.value = currentResolutionIndex;
        UpdateResolutionText(currentResolutionIndex);
    }

    void OnSliderValueChanged(float value)
    {
        currentResolutionIndex = Mathf.RoundToInt(value);
        UpdateResolutionText(currentResolutionIndex);
    }

    void UpdateResolutionText(int index)
    {
        Resolution res = availableResolutions[index];
        resolutionText.text = $"resolution: {res.width}x{res.height}";
    }

    public void ApplyResolution()
    {
        Resolution res = availableResolutions[currentResolutionIndex];
        Screen.SetResolution(res.width, res.height, Screen.fullScreen);
    }
}