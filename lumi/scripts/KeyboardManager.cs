using UnityEngine;
using UnityEngine.UI;

public class KeyboardManager : MonoBehaviour
{
    public Image wKeyImage;
    public Image aKeyImage;
    public Image sKeyImage;
    public Image dKeyImage;
    public Image spaceImage;

    public Sprite wIdleSprite;
    public Sprite aIdleSprite;
    public Sprite sIdleSprite;
    public Sprite dIdleSprite;
    public Sprite spaceIdleSprite;

    public Sprite wPressedSprite;
    public Sprite aPressedSprite;
    public Sprite sPressedSprite;
    public Sprite dPressedSprite;
    public Sprite spacePressedSprite;

    public Sprite upIdleSprite;
    public Sprite leftIdleSprite;
    public Sprite downIdleSprite;
    public Sprite rightIdleSprite;

    public Sprite upPressedSprite;
    public Sprite leftPressedSprite;
    public Sprite downPressedSprite;
    public Sprite rightPressedSprite;

    public Animation wKeyAnimation;
    public Animation aKeyAnimation;
    public Animation sKeyAnimation;
    public Animation dKeyAnimation;
    public Animation spaceKeyAnimation;

    private bool usingArrowKeys = false;

    void Update()
    {
        if (Input.GetKey(KeyCode.Space))
        {
            spaceImage.sprite = spacePressedSprite;
            spaceKeyAnimation.Play("Spacebar Press");
        }
        else
        {
            spaceImage.sprite = spaceIdleSprite;
        }

        if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.LeftArrow) ||
            Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.RightArrow))
        {
            usingArrowKeys = true;
        }
        else if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.A) ||
                 Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.D))
        {
            usingArrowKeys = false;
        }

        Sprite upIdle = usingArrowKeys ? upIdleSprite : wIdleSprite;
        Sprite upPressed = usingArrowKeys ? upPressedSprite : wPressedSprite;

        Sprite leftIdle = usingArrowKeys ? leftIdleSprite : aIdleSprite;
        Sprite leftPressed = usingArrowKeys ? leftPressedSprite : aPressedSprite;

        Sprite downIdle = usingArrowKeys ? downIdleSprite : sIdleSprite;
        Sprite downPressed = usingArrowKeys ? downPressedSprite : sPressedSprite;

        Sprite rightIdle = usingArrowKeys ? rightIdleSprite : dIdleSprite;
        Sprite rightPressed = usingArrowKeys ? rightPressedSprite : dPressedSprite;

        wKeyImage.sprite = Input.GetKey(usingArrowKeys ? KeyCode.UpArrow : KeyCode.W) ? upPressed : upIdle;
        aKeyImage.sprite = Input.GetKey(usingArrowKeys ? KeyCode.LeftArrow : KeyCode.A) ? leftPressed : leftIdle;
        sKeyImage.sprite = Input.GetKey(usingArrowKeys ? KeyCode.DownArrow : KeyCode.S) ? downPressed : downIdle;
        dKeyImage.sprite = Input.GetKey(usingArrowKeys ? KeyCode.RightArrow : KeyCode.D) ? rightPressed : rightIdle;

        if (Input.GetKey(usingArrowKeys ? KeyCode.UpArrow : KeyCode.W)) wKeyAnimation.Play("Pressed Keyboard");
        if (Input.GetKey(usingArrowKeys ? KeyCode.LeftArrow : KeyCode.A)) aKeyAnimation.Play("Pressed Keyboard");
        if (Input.GetKey(usingArrowKeys ? KeyCode.DownArrow : KeyCode.S)) sKeyAnimation.Play("Pressed Keyboard");
        if (Input.GetKey(usingArrowKeys ? KeyCode.RightArrow : KeyCode.D)) dKeyAnimation.Play("Pressed Keyboard");
    }
}
