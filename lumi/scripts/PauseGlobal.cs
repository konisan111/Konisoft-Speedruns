using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PauseGlobal : MonoBehaviour
{
    public bool delayBool;
    public float delayTime;

    public List<MonoBehaviour> excludedObjects = new List<MonoBehaviour>();

    public void StopGameTime()
    {
        if (delayBool)
        {
            StartCoroutine(WaitForDelay());
        }
        else
        {
            Time.timeScale = 0;
            EnableExcludedUpdates(true);
        }
    }

    public IEnumerator WaitForDelay()
    {
        yield return new WaitForSecondsRealtime(delayTime);
        Time.timeScale = 0;
        EnableExcludedUpdates(true);
    }

    public void RunGame()
    {
        Time.timeScale = 1;
        EnableExcludedUpdates(false);
    }

    private void EnableExcludedUpdates(bool enable)
    {
        foreach (MonoBehaviour obj in excludedObjects)
        {
            if (obj != null)
                obj.enabled = enable;
        }
    }
}
