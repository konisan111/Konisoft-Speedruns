using System.Linq;
using UnityEngine;
using UnityEngine.EventSystems;

public class EnviormentSwitch : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    public GameObject switchingEnv;
    public GameObject menuEnv;
    public GameObject lumiBlinker;
    public GameObject[] levelEnviorments;

    private bool isHovered = false;
    private GameObject lastSelected;

    void Start()
    {
        levelEnviorments = Resources.FindObjectsOfTypeAll<GameObject>()
            .Where(obj => obj.CompareTag("MenuEnviorments"))
            .ToArray();
    }

    void Update()
    {
        GameObject currentSelected = EventSystem.current.currentSelectedGameObject;

        if (currentSelected == gameObject && lastSelected != gameObject && !isHovered) { ActivateEnviorment(); }
        else if (lastSelected == gameObject && currentSelected != gameObject && !isHovered) { RestoreMenuEnviorment(); }

        lastSelected = currentSelected;
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        isHovered = true;
        ActivateEnviorment();
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        isHovered = false;
        RestoreMenuEnviorment();
    }

    private void ActivateEnviorment()
    {
        Debug.Log("Enviorment Changed!");
        DisableOtherEnviorments();
        menuEnv.SetActive(false);
        switchingEnv.SetActive(true);
        lumiBlinker.SetActive(true);
    }

    private void RestoreMenuEnviorment()
    {
        Debug.Log("Enviorment is back to the menu enviorment!");
        lumiBlinker.SetActive(false);
    }

    public void DisableOtherEnviorments()
    {
        foreach (GameObject item in levelEnviorments)
        {
            if (item != null && item.name != switchingEnv.name)
                item.SetActive(false);
        }
    }
}
