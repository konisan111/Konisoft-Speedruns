using Unity.VisualScripting;
using UnityEngine;

public class KeyManager : MonoBehaviour
{
    public GameObject prefabUp;
    public GameObject prefabDown;
    public GameObject prefabRight;
    public GameObject prefabLeft;
    public GameObject prefabSlot;

    public Transform grid;
    public GameObject gridObject;

    public GameObject playerObject;
    PlayerController playerController;

    CoreCompiler coreCompiler;

    public AudioSource audioSource;
    public AudioClip placeSoundFirst;
    public AudioClip placeSoundSecond;
    public AudioClip placeSoundThird;
    public AudioClip placeSoundFourth;
    public AudioClip placeSoundFifth;

    void Start()
    {
        playerObject = GameObject.FindWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();

        coreCompiler = gridObject.GetComponent<CoreCompiler>();
    }

    void Update()
    {
        gameObject.transform.SetSiblingIndex(grid.transform.childCount - 1);

        if (Input.GetKeyDown(KeyCode.Backspace))
        {
            DeleteLastSlot();
        }

        if (Input.GetKeyDown(KeyCode.Space))
        {
            print("Meow");
            coreCompiler.CallGridCommandCheck();
        }

        if (Input.GetKeyDown(KeyCode.UpArrow))
        {
            audioSource.PlayOneShot(placeSoundFirst);
            SpawnObject(prefabSlot);
            AddToFirstEmptySlot(prefabUp);
        }

        if (Input.GetKeyDown(KeyCode.DownArrow))
        {
            audioSource.PlayOneShot(placeSoundSecond);
            SpawnObject(prefabSlot);
            AddToFirstEmptySlot(prefabDown);
        }

        if (Input.GetKeyDown(KeyCode.RightArrow))
        {
            audioSource.PlayOneShot(placeSoundFourth);
            SpawnObject(prefabSlot);
            AddToFirstEmptySlot(prefabRight);
        }

        if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            audioSource.PlayOneShot(placeSoundThird);
            SpawnObject(prefabSlot);
            AddToFirstEmptySlot(prefabLeft);
        }
    }

    public void DeleteLastSlot()
    {
        int lastIndex = gridObject.transform.childCount - 1;
        Transform lastChild = gridObject.transform.GetChild(lastIndex);
        Destroy(lastChild.gameObject);
    }

    public void SpawnObject(GameObject prefab)
    {
        if (prefab != null && grid != null)
        {
            GameObject spawnedObject = Instantiate(prefab, grid);
            spawnedObject.transform.localPosition = Vector3.zero;
        }
        else { Debug.LogError("Prefab or ParentTransform is not assigned."); }
    }

    public void AddToFirstEmptySlot(GameObject itemPrefab)
    {
        foreach (Transform slot in grid)
        {
            if (slot.childCount == 0)
            {
                Instantiate(itemPrefab, slot);
                break;
            }
        }
    }
}
