using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
public class CompilerGrid : MonoBehaviour, IDropHandler
{
    public GridLayoutGroup gridLayoutGroup;

    void Start()
    {
        if (gridLayoutGroup == null)
        {
            gridLayoutGroup = GetComponent<GridLayoutGroup>();
        }
    }

    public void OnDrop(PointerEventData eventData)
    {
        RectTransform droppedItem = eventData.pointerDrag.GetComponent<RectTransform>();
        if (droppedItem != null)
        {
            int closestIndex = GetClosestGridIndex(droppedItem);
            Transform targetTransform = gridLayoutGroup.transform.GetChild(closestIndex);
            droppedItem.SetParent(targetTransform.parent);
            droppedItem.SetSiblingIndex(closestIndex);
        }
    }

    private int GetClosestGridIndex(RectTransform droppedItem)
    {
        int closestIndex = 0;
        float closestDistance = float.MaxValue;
        
        for (int i = 0; i < gridLayoutGroup.transform.childCount; i++)
        {
            RectTransform gridItem = gridLayoutGroup.transform.GetChild(i).GetComponent<RectTransform>();
            float distance = Vector2.Distance(droppedItem.position, gridItem.position);
            
            if (distance < closestDistance)
            {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        return closestIndex;
    }
}
