using UnityEngine;

public class GridDrawer : MonoBehaviour
{
    public Color gridColor = Color.white;
    public float cellSize = 1f;
    public int gridWidth = 10;
    public int gridHeight = 10;
    public float lineWidth = 0.05f;
    public Material lineMaterial;

    void Start()
    {
        DrawGrid();
    }

    void DrawGrid()
    {
        for (int x = 0; x <= gridWidth; x++)
        {
            CreateLine(new Vector3(x * cellSize, 0, 0), new Vector3(x * cellSize, gridHeight * cellSize, 0));
        }

        for (int y = 0; y <= gridHeight; y++)
        {
            CreateLine(new Vector3(0, y * cellSize, 0), new Vector3(gridWidth * cellSize, y * cellSize, 0));
        }
    }

    void CreateLine(Vector3 start, Vector3 end)
    {
        GameObject lineObj = new GameObject("GridLine");
        lineObj.transform.parent = transform;

        LineRenderer lr = lineObj.AddComponent<LineRenderer>();
        lr.material = lineMaterial != null ? lineMaterial : new Material(Shader.Find("Sprites/Default"));
        lr.startColor = gridColor;
        lr.endColor = gridColor;
        lr.startWidth = lineWidth;
        lr.endWidth = lineWidth;
        lr.useWorldSpace = false;
        lr.positionCount = 2;
        lr.SetPosition(0, start);
        lr.SetPosition(1, end);
    }
}