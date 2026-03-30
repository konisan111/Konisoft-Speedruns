using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class StarRatingPanel : MonoBehaviour
{
    public string sceneName;
    public Image star1;
    public Image star2;
    public Image star3;
    [Range(0f, 1f)] public float dimmedOpacity = 0.35f;
    [Range(0f, 1f)] public float fullOpacity = 1f;

    public void Update()
    {
        if (GameManager.Instance == null || string.IsNullOrEmpty(sceneName)) return;

        int starsEarned = GameManager.Instance.GetLevelStars(sceneName);

        SetStarOpacity(star1, starsEarned >= 1);
        SetStarOpacity(star2, starsEarned >= 2);
        SetStarOpacity(star3, starsEarned >= 3);
    }

    void SetStarOpacity(Image starImage, bool isEarned)
    {
        if (starImage == null) return;

        Color c = Color.white;

        if (isEarned)
        {
            c.a = fullOpacity;
        }
        else
        {
            c = Color.Lerp(Color.white, Color.black, 0.4f);
            c.a = dimmedOpacity;
        }

        starImage.color = c;
    }
}