using UnityEngine;

public class UIPlatformManager : MonoBehaviour{
    public GameObject mobileUIButtonPack;
    public GameObject mobileUIControls;
    public GameObject mobileUIMaps;
    public GameObject mobileUICounters;

    public GameObject UIButtonPack;
    public GameObject UIMaps;
    public GameObject UICounters;

    void Start(){
        if (Application.platform == RuntimePlatform.Android || Application.platform == RuntimePlatform.IPhonePlayer){
            UIButtonPack.SetActive(false);
            UIMaps.SetActive(false);
            UICounters.SetActive(false);

            mobileUIButtonPack.SetActive(true);
            mobileUIControls.SetActive(true);
            mobileUIMaps.SetActive(true);
            mobileUICounters.SetActive(true);
        }
    }

}
