using System.Transactions;
using UnityEngine;

public class ScoreItemUI : MonoBehaviour
{
    public Camera mainCamera;
    public float moveSpeed = 5f;
    private RectTransform targetUI;
    public string targetTag;
    public GameObject playerObject;
    PlayerController playerController;

    void Start()
    {
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
        GameObject uiObject = GameObject.FindGameObjectWithTag(targetTag);
        if (uiObject != null) targetUI = uiObject.GetComponent<RectTransform>();
        if (mainCamera == null) mainCamera = Camera.main;
    }

    void Update()
    {
        if (targetUI == null || mainCamera == null) return;
        Vector3 screenPos = RectTransformUtility.WorldToScreenPoint(null, targetUI.position);
        Vector3 worldPos = mainCamera.ScreenToWorldPoint(new Vector3(screenPos.x, screenPos.y, mainCamera.nearClipPlane + 5f));
        transform.position = Vector3.MoveTowards(transform.position, worldPos, moveSpeed * Time.deltaTime);

        if (Vector3.Distance(transform.position, worldPos) < 0.01f) { Destroy(gameObject); }
        if (playerController.shutDownCompiler) Destroy(gameObject);
    }
}
