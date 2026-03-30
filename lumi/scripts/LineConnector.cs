using UnityEngine;

public class LineConnector : MonoBehaviour{
    public Transform target;
    public GameObject UILineConnector;
    public RectTransform uiElement;
    private LineRenderer lineRenderer;
    public int segmentCount = 20;
    public float waveHeight = 0.5f;

    void Start(){
        lineRenderer = GetComponent<LineRenderer>();
        lineRenderer.positionCount = segmentCount + 2;
    }

    void Update(){
        if (UILineConnector.active){
            Vector3 targetPos = target.position;
            Vector3 screenPos = Camera.main.WorldToScreenPoint(targetPos);
            Vector3 uiPos = uiElement.position;

            Vector3 start = targetPos;
            Vector3 end = Camera.main.ScreenToWorldPoint(new Vector3(uiPos.x, uiPos.y, screenPos.z));

            lineRenderer.enabled = true;
            lineRenderer.SetPosition(0, start);
            lineRenderer.SetPosition(segmentCount + 1, end);

            for (int i = 1; i <= segmentCount; i++){
                float t = (float)i / (segmentCount + 1);
                Vector3 point = Vector3.Lerp(start, end, t);
                point.y += Mathf.Sin(t * Mathf.PI * 2) * waveHeight;
                lineRenderer.SetPosition(i, point);
            }
        }
        else {
            lineRenderer.enabled = false;
        }
    }
}
