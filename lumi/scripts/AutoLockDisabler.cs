using UnityEngine;

public class AutoLockDisabler : MonoBehaviour
{
    CameraHovering camCode;
    public GameObject cameraObject;

    public void OnClickTrigger()
    {
        camCode = cameraObject.GetComponent<CameraHovering>();
        camCode.autoLock = false;
    }
}
