import * as core from '@actions/core'
import * as deliver from '../src/deliver'
import {DockerImage} from '../src/docker'

describe('setDeliver()', () => {
  test('throw error if there is no built image', async () => {
    const image = {
      imageID: '1234567890',
      imageName: '1234567890.dkr.ecr.ap-northeast-1.amazonaws.com/test/app',
      tags: ['1qa2sw3de4fr5gt6hy7ju8ik9lo0lp',  'v.1.0', 'latest']
    } as DockerImage
    const gitHubRunID = '0987654321'

    const setOutput = jest.spyOn(core, 'setOutput').mockImplementation(() => {})

    await deliver.setDelivery({
      dockerImage: image,
      gitHubRunID: gitHubRunID
    })
    expect(setOutput).toHaveBeenCalledWith('built_image_name', image.imageName)
    expect(setOutput).toHaveBeenCalledWith('built_image_id', image.imageID)
    expect(setOutput).toHaveBeenCalledWith('built_image_tag', image.tags[0])
    expect(setOutput).toHaveBeenCalledWith('git_hub_run_id', gitHubRunID)
  })
})
