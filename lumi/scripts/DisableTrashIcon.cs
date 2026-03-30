using UnityEngine;
using System.Linq;

public class DisableTrashIcon : MonoBehaviour
{
    public string targetObjectTag = "TrashIcon";
    public GameObject cachedTargetObject;

    void Awake(){
        cachedTargetObject = Resources
            .FindObjectsOfTypeAll<GameObject>()
            .FirstOrDefault(go => go.CompareTag(targetObjectTag));
    }

    public void DisableOnClick(){
        cachedTargetObject.SetActive(false);
    }
}
