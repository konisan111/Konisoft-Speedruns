using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class CoreCompiler : MonoBehaviour
{

    [Header("Numericals")]
    public List<string> commandNumericals = new List<string>();
    [Header("CompilerLock")]
    PlayerController playerController;
    public GameObject playerObject;

    //Older me here, what in the actual fuck is that code? I have no idea what is this even doing.
    //Future me here, I'm not even using this anymore XDD but, ima keep it since it's funny.
    public void CallGridCommandCheck()
    {
        playerController = playerObject.GetComponent<PlayerController>();
        if (playerController.stopActions == false)
        {
            //Clearing the List of values, we dun wanna stack not valid informations, right?
            commandNumericals.Clear();
            GridLayoutGroup gridLayoutGroup = GetComponent<GridLayoutGroup>();
            RectTransform[] children = new RectTransform[gridLayoutGroup.transform.childCount];

            for (int i = 0; i < gridLayoutGroup.transform.childCount; i++)
            {
                children[i] = gridLayoutGroup.transform.GetChild(i) as RectTransform;
            }

            int columns = (int)(gridLayoutGroup.GetComponent<RectTransform>().rect.width / gridLayoutGroup.cellSize.x);
            for (int row = 0; row < Mathf.CeilToInt((float)children.Length / columns); row++)
            {
                for (int column = 0; column < columns; column++)
                {
                    int index = row * columns + column;
                    if (index < children.Length)
                    {
                        //Debugging the values, locations, types, names, and tags.
                        if (children[index].childCount > 0)
                        {
                            Debug.Log($"Element at Row: {row}, Column: {column} (Index: {index}) is {children[index].gameObject.name} Command: {children[index].gameObject.name} contains an Item: {children[index].GetChild(0).gameObject.name} with the command: {children[index].GetChild(0).gameObject.tag}");

                            // Stripping out the commands, translating them to numericals, and then listing.
                            if (children[index].GetChild(0).gameObject.tag == "cm_goright")
                                commandNumericals.Add("1");
                            else if (children[index].GetChild(0).gameObject.tag == "cm_goleft")
                                commandNumericals.Add("2");
                            else if (children[index].GetChild(0).gameObject.tag == "cm_goup")
                                commandNumericals.Add("3");
                            else if (children[index].GetChild(0).gameObject.tag == "cm_godown")
                                commandNumericals.Add("4");
                            else if (children[index].GetChild(0).gameObject.tag == "cm_startp")
                                commandNumericals.Add("5");
                        }
                        else
                        {
                            Debug.Log($"Element at Row: {row}, Column: {column} (Index: {index}) is {children[index].gameObject.name} Command: {children[index].gameObject.name} is empty.");
                            commandNumericals.Add("0");
                        }
                    }
                }
            }

            StringBuilder();
        }
    }

    public void StringBuilder()
    {
        string result = "";
        foreach (var item in commandNumericals) { result += item.ToString() + ", "; }
        Debug.Log($"Injectable numericals (command shortforms): {result}");
    }
}
