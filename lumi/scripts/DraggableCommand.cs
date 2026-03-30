using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class DraggableCommand : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler, IPointerClickHandler{
    public Image image;
    public Transform parentAfterDrag;
    void Start(){
        if (Application.platform == RuntimePlatform.Android) Destroy(this);
        if (Application.platform == RuntimePlatform.IPhonePlayer) Destroy(this);
    }

    public void OnBeginDrag(PointerEventData eventData){
        parentAfterDrag = transform.parent;
        transform.SetParent(transform.root);
        transform.SetAsLastSibling();
        image.raycastTarget = false;
    }

    public void OnDrag(PointerEventData eventData){
        transform.position = Input.mousePosition;
    }
    public void OnEndDrag(PointerEventData eventData){
        transform.SetParent(parentAfterDrag);
        image.raycastTarget = true;
    }

    public void OnPointerClick(PointerEventData eventData){
        throw new System.NotImplementedException();
    }
}
