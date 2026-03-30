using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections;
using System.Collections.Generic;
public class CommandSlot : MonoBehaviour, IDropHandler {
    public void OnDrop(PointerEventData eventData) {
        if (transform.childCount == 0) {
            GameObject dropped = eventData.pointerDrag;
            DraggableCommand draggableCommand = dropped.GetComponent<DraggableCommand>();
            draggableCommand.parentAfterDrag = transform;
        }
    }
}
