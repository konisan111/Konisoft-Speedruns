using System.Collections;
using UnityEngine;

public class EyeController : MonoBehaviour
{
    public GameObject sprite;
    public float minTimeOn = 1.0f;
    public float maxTimeOn = 5.0f;
    public float minTimeOff = 1.0f;
    public float maxTimeOff = 5.0f;

    void Start()
    {
        StartCoroutine(ToggleSprite());
    }

    IEnumerator ToggleSprite()
    {
        while (true)
        {
            sprite.SetActive(true);
            float timeOn = Random.Range(minTimeOn, maxTimeOn);
            yield return new WaitForSeconds(timeOn);

            sprite.SetActive(false);
            float timeOff = Random.Range(minTimeOff, maxTimeOff);
            yield return new WaitForSeconds(timeOff);
        }
    }
}
