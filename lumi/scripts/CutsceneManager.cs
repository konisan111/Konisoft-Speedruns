using UnityEngine;

public class CutsceneManager : MonoBehaviour{
    public GameObject backgroundMusic;
    public GameObject cutsceneMusic;
    void Start(){
        backgroundMusic.SetActive(false);
        cutsceneMusic.SetActive(true);
    }
}
