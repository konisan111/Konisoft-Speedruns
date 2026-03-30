using UnityEngine;
using UnityEngine.UI;

public class Timer : MonoBehaviour
{
    public Text timerText;
    private float elapsedTime;
    private int minutes;
    private int seconds;

    void Update()
    {
        elapsedTime += Time.deltaTime;
        minutes = Mathf.FloorToInt(elapsedTime / 60F);
        seconds = Mathf.FloorToInt(elapsedTime % 60F);
        timerText.text = string.Format("{0:00}:{1:00}", minutes, seconds);
    }
}

