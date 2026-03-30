using System.Collections;
using UnityEngine;

public class SelfEnable : MonoBehaviour
{
    public bool otherEnable;
    public float delay;
    public GameObject otherObject;
    void Update()
    {
        StartCoroutine(DelayBeforeDisable());
    }

    IEnumerator DelayBeforeDisable()
    {
        if (otherEnable) { yield return new WaitForSeconds(delay); otherObject.SetActive(true); }
        else
        {
            yield return new WaitForSeconds(delay);
            gameObject.SetActive(false);
        }
    }
}
