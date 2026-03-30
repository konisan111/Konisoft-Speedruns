using UnityEngine;
using UnityEngine.UI;

public class ScreenManager : MonoBehaviour{
    public Button fullscreenButton;
    public Button windowedButton;

    public void TriggerFullscreen(){
        if (fullscreenButton != null){
            fullscreenButton.onClick.AddListener(() => Screen.SetResolution(Screen.width, Screen.height, FullScreenMode.ExclusiveFullScreen));
            print("Fullscreen triggered!");
        }
    }
    public void TriggerWindowed(){
        if (windowedButton != null){
            windowedButton.onClick.AddListener(() => Screen.SetResolution(Screen.width, Screen.height, FullScreenMode.Windowed));
            print("Windowed triggered!");
        }
    }
}