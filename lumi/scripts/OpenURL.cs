using System.Collections.Specialized;
using UnityEngine;

public class OpenURL : MonoBehaviour{
    public string urlLink;
    public void OpenURLViaClick(){
        Application.OpenURL(urlLink);
    }
}
