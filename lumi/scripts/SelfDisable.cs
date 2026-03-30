using System.Collections;
using UnityEngine;

public class SelfDisable : MonoBehaviour
{
    public bool otherDisable;
    public bool selfDestroy;
    public float delay;
    public GameObject otherObject;
    void Update()
    {
        StartCoroutine(DelayBeforeDisable());
    }

    IEnumerator DelayBeforeDisable()
    {
        if (selfDestroy) { yield return new WaitForSeconds(delay); Destroy(gameObject); }

        if (otherDisable) { yield return new WaitForSeconds(delay); otherObject.SetActive(false); }
        else
        {
            yield return new WaitForSeconds(delay);
            gameObject.SetActive(false);
        }
    }
}
