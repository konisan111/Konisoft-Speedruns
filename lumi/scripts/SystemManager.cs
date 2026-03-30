using System.Collections;
using UnityEngine;

public class SystemManager : MonoBehaviour{
    public bool SystemScreenSleepDisable = true;
    public GameObject menuLogo;
    public GameObject menuUI;
    void Update(){
         if(SystemScreenSleepDisable) Screen.sleepTimeout = SleepTimeout.NeverSleep;
    }

    void Start(){
        StartCoroutine(DelayLogoAtFirstStart());
    }

    public IEnumerator DelayLogoAtFirstStart() {
        yield return new WaitForSeconds(2.5f);
        menuLogo.SetActive(true);
        menuUI.SetActive(true);
    }
}
