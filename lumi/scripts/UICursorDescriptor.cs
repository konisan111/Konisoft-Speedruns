using UnityEngine;
using UnityEngine.EventSystems;
using System.Linq;

public class UICursorDescriptor : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler {
    public bool callByName;
    public string targetObjectTag = "TrashIcon";
    public GameObject targetObject;

    private GameObject cachedTargetObject;

    void Awake(){
        if (callByName){
            cachedTargetObject = Resources
                .FindObjectsOfTypeAll<GameObject>()
                .FirstOrDefault(go => go.CompareTag(targetObjectTag));
        }
    }
    
    void Start(){
        if (Application.platform == RuntimePlatform.WindowsPlayer) Destroy(this);
        if (Application.platform == RuntimePlatform.IPhonePlayer) Destroy(this);

        if (callByName)
        {
            if (cachedTargetObject != null)
                cachedTargetObject.SetActive(false);
        }
        else
        {
            if (targetObject != null)
                targetObject.SetActive(false);
        }
    }

    public void OnPointerEnter(PointerEventData eventData){
        if (callByName) {
            if (cachedTargetObject != null)
                cachedTargetObject.SetActive(true);
        }
        else if(targetObject != null){
            targetObject.SetActive(true);
        }
    }

    public void OnPointerExit(PointerEventData eventData){
        if (callByName) {
            if (cachedTargetObject != null)
                cachedTargetObject.SetActive(false);
        }
        else if(targetObject != null){
            targetObject.SetActive(false);
        }
    }
}
